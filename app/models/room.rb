class Room < ActiveRecord::Base
  has_many :members
end
