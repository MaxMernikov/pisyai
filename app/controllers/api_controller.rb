class ApiController < ApplicationController
  before_action :get_room
  def all_messages
    ap JSON.parse("[#{$redis.get(params[:api_id] + '_messages')}]")
    render json: JSON.parse("[#{$redis.get(params[:api_id] + '_messages')}]" )
  end

  private

  def get_room
    @room = Room.opens.find_by(code: params[:api_id])
  end
end