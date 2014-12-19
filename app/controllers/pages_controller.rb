class PagesController < ApplicationController
  def index
  end

  def test
    $redis.publish 'create-room', 'check'
  end

  def send_message
    $redis.publish params[:room], {username: params[:username], message: params[:message]}.to_json
    render text: '$("textarea").val("")'
  end

  def login_or_create_room
    if params[:room].blank?
      room = Room.create
      room.members.create(username: params[:username])

      cookies[:game_credentials] = { value: { username: params[:username], room: room.code }.to_json, expires: 1.hour.from_now }

      render text: "window.location.replace('/#{room.code.downcase}');"
    end
  end

  def room
    redirect_to root_path if cookies[:game_credentials].blank?
    game_credentials = JSON.parse(cookies[:game_credentials])

    @room = Room.opens.find_by(code: game_credentials['room'])
    redirect_to root_path, alert: 'game not found' if @room.blank?

    @room_members = @room.members
    @member = @room_members.find_by(username: game_credentials['username'])
    # @user = User.find_by(username: params[:username])
    # ap game_credentials
    # render text: params
  end
end
