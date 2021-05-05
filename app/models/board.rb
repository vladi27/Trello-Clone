class Board < ApplicationRecord
    validates :title, :owner_id, presence: true

    belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User


    has_many :memberships

    has_many :members, through: :memberships, source: :user


    has_many :lists,
    foreign_key: :board_id,
    class_name: :List
end
