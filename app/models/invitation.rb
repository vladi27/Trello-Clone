class Invitation < ApplicationRecord
before_create :generate_token
before_save :check_user_existence

def generate_token
   self.token = Digest::SHA1.hexdigest([self.user_board_id, Time.now, rand].join)
end

def check_user_existence
    recipient = User.find_by(email: email)
   if recipient
      self.recipient_id = recipient.id
   end
 end
end