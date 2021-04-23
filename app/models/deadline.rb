class Deadline < ApplicationRecord
validates :duedate, :card_id, presence: true

# belongs_to :card

def duedate=(time)
 if time.is_a?(Hash)
  self[:duedate] = parse_datetime(time)
 else
  self[:duedate] = time
 end

 def parse_datetime(hash)
 Time.now.parse("#{parse_date(hash[“date”])} #{hash[“hour”]}:#{hash[“min”]}")
end
end
def parse_date(string)
 array = string.split(“/”)
 first_item = array.pop
 array.unshift(first_item).join(“-”)
end




end