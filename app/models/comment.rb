class Comment < ApplicationRecord
    validates :body, :author, :card_id,  presence: :true

    belongs_to :card,
    foreign_key: :card_id,
    class_name: :Card
end