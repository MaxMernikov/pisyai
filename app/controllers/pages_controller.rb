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
  end
end
