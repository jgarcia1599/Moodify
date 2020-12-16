from flask import Flask, flash, redirect, render_template, request, session, abort,make_response,jsonify
 
import sys
import spotipy
import spotipy.util as util
from spotipy import oauth2
import random

from moodtape_functions import authenticate_spotify, aggregate_top_artists, aggregate_top_tracks, select_tracks, create_playlist

client_id = "a820c3511f824a918a75d17a862c5ed7"
client_secret = "737bb17cedcf46349ba3005de0ae25fc"
redirect_uri = "http://localhost:8888/callback/"
scope = 'user-library-read user-top-read playlist-modify-public user-follow-read'

# username = "hi18mft50jzkittzkpvgfw9mz"
# token = util.prompt_for_user_token(username, scope, client_id, client_secret, redirect_uri)
access_token = ""
# cache = ".cache-" + username
# sp_oauth = oauth2.SpotifyOAuth(client_id, client_secret,redirect_uri,scope=scope,cache_path=cache )
sp_oauth = None

# token = util.oauth2.SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)

# cache_token = token.get_access_token()


app = Flask(__name__)

@app.route('/')
def my_form():
	return render_template('username.html')

@app.route('/', methods=['POST'])
def index():
	username = request.form['username']
	cache = ".cache-" + username
	global sp_oauth
	global access_token
	sp_oauth = oauth2.SpotifyOAuth(client_id, client_secret,redirect_uri,scope=scope,cache_path=cache )
	
	# access_token = ""
	
	token_info = sp_oauth.get_cached_token()
	print(token_info)
	if token_info:
		print("Found cached token!")
		access_token = token_info['access_token']
		print(access_token)
		print('================================================')
		return render_template('index.html') 
	else:
		auth_url = sp_oauth.get_authorize_url()
		return redirect(auth_url)
@app.route('/results')
def results():
	playlist = request.args.get('url')
	return render_template('playlist.html',playlist = playlist)

@app.route('/callback/')
def my_callback():
	global access_token
	print(access_token)
	url = request.url
	
	code = sp_oauth.parse_response_code(url)
	if code:
		print("Found Spotify auth code in Request URL! Trying to get valid access token...")
		token_info = sp_oauth.get_access_token(code)
		access_token = token_info['access_token']

	if access_token:
		return render_template('index.html')

	else:
		return render_template('username.html')

@app.route("/moodify", methods=['POST'])
def moodify():
	# print(request.json)
	global access_token
	print(access_token)
	print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

	mood = request.json['mood']
	# username = request.form['username']
	mood = float(mood)
	# token = util.prompt_for_user_token(username, scope, client_id, client_secret, redirect_uri)
	spotify_auth = authenticate_spotify(access_token)
	top_artists = aggregate_top_artists(spotify_auth)
	top_tracks = aggregate_top_tracks(spotify_auth, top_artists)
	selected_tracks = select_tracks(spotify_auth, top_tracks, mood)
	playlist = create_playlist(spotify_auth, selected_tracks, mood)
	res = make_response(jsonify({
	"result":playlist
	}),200)
	return res


if __name__ == "__main__":

	app.run(host='0.0.0.0')
