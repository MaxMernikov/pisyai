module ApplicationHelper

  def last_credentials
    unless @last_credentials
      credentials = { username: '', room: '' }
      return credentials if cookies[:game_credentials].blank? 

      cookies_credentials = JSON.parse(cookies[:game_credentials])
      credentials[:username] = cookies_credentials['username']
      credentials[:room] = cookies_credentials['room'] if Room.opens.find_by(code: cookies_credentials['room']).present?
      credentials
      @last_credentials = credentials
    end
    @last_credentials
  end
end
