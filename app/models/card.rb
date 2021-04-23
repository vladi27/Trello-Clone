class Card < ApplicationRecord
    validates :title, presence: true

    belongs_to :list,
    foreign_key: :list_id,
    class_name: :List

    has_many :comments,
    foreign_key: :card_id,
    class_name: :Comment

    # has_one :deadline

# def due_date=(time)
#  if time.is_a?(Hash)
#   self[:due_date] = parse_datetime(time)
#  else
#   self[:due_date] = time
#  end

#  def parse_datetime(hash)
#  Time.now.parse("#{parse_date(hash[“date”])} #{hash[“hour”]}:#{hash[“min”]}")
# end
# end
# def parse_date(string)
#  array = string.split(“/”)
#  first_item = array.pop
#  array.unshift(first_item).join(“-”)
# end

end
