class Card < ApplicationRecord
    validates :title, presence: true

    belongs_to :list,
    foreign_key: :list_id,
    class_name: :List

    has_many :comments,
    foreign_key: :card_id,
    class_name: :Comment
end
