class Membership < ApplicationRecord
validates :user_id, :board_id, presence: :true

belongs_to :board
belongs_to :user
end