class Room < ActiveRecord::Base
  has_many :members

  scope :opens, -> { where(close: false)}

  before_create :get_room_code

private

  def get_room_code
    new_code = rand_code
    while Room.opens.where(code: new_code ).first.present?
      new_code = rand_code
    end
    self.code
  end

  def rand_code
    code_letters = ('A'..'Z').to_a
    self.code = (0..4).map { code_letters[rand(code_letters.length)] }.join
  end
end
