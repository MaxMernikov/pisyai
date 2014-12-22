class PagesController < ApplicationController
  before_action :parse_credentials, only: [:send_message, :room, :start_game]
  def index
  end

  def login_or_create_room
    room = params[:room].blank? ? Room.create : Room.opens.find_by(code: params[:room].upcase)

    if room.present?
      # room.members.find_or_create_by(username: params[:username])

      member = room.members.find_by(username: params[:username])
      if member.blank?
        member = room.members.create(username: params[:username])
        ap 'join'
        $redis.publish room.code, { key: 'join_in_room', val: params[:username] }.to_json
      end

      cookies[:game_credentials] = { value: { username: params[:username], room: room.code }.to_json, expires: 1.hour.from_now }
      render text: "window.location.replace('/#{room.code.downcase}');"
    else
      render text: "alert('room not found')" 
    end
    
  end

  def room
    return redirect_to(root_path, notice: 'комната не существует') if Room.opens.find_by(code: params[:id].upcase).blank?

    @room = Room.opens.find_by(code: @game_credentials['room'])
    redirect_to root_path, alert: 'game not found' if @room.blank?

    $redis.publish 'create-room', @room.code
    @room_members = @room.members
    @member = @room_members.find_by(username: @game_credentials['username'])
    @messages = $redis.get "#{@game_credentials['room']}_messages"
    @messages = '' if @messages.blank?
  end

  def send_message
    $redis.append "#{@game_credentials['room']}_messages", "#{@game_credentials['username']}: #{params['message']}<br>"

    $redis.publish @game_credentials['room'], { key: 'send_message', val: {username: @game_credentials['username'], message: params['message'] } }.to_json

    render text: "$('input[name=\"message\"]').val('')" 
  end

  def start_game
    quest = Quest.first

    $redis.publish @game_credentials['room'], { key: 'start_game', val: { question: quest.question } }.to_json
  end

  def parse_credentials
    return redirect_to(root_path, notice: 'необходимо залогинится снова') if cookies[:game_credentials].blank?

    @game_credentials = JSON.parse(cookies[:game_credentials])
  end

end
