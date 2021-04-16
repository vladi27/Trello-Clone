class Api::InvitationsController < ApplicationController
 def create
   @invite = Invitation.new(invite_params) # Make a new Invite
   @invite.sender_id = current_user.id # set the sender to the current user
   board = Board.find(params[:invitation][:user_board_id])
   if @invite.save
     if @invite.recipient_id != nil
        recipient  = User.find(@invite.recipient_id)
       #send a notification email
        InvitationMailer.existing_user_email(@invite, board, current_user).deliver_now
        recipient.boards.push(board)
     else
        InvitationMailer.new_user_email(@invite, board).deliver_now #send the invite data to our mailer to deliver the email
     end
   else
       render json: @invite.errors.full_messages, status: 422
   end
end


 def invite_params
    params.require(:invitation).permit(:user_board_id, :email)
  end
end