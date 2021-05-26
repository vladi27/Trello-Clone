class InvitationMailer < ApplicationMailer

default from: 'vbulvakhter@gmail.com'


def new_user_email(invite, board)
    @invite = invite
    # @url = "http://localhost:3000/#/signup/?invite_token=#{@invite.token}"
    @url = "https://yello-fsp.herokuapp.com/#/signup/?invite_token=#{@invite.token}"
    @board = board
    mail(to: @invite.email, subject: 'Please join Yello')
end


def existing_user_email(invite, board, user)
    @invite = invite
    # @url = 'http://localhost:3000/#/login'
    @url = 'https://yello-fsp.herokuapp.com/#/login'
    @board = board
    @user = user
    mail(to: @invite.email, subject: 'You have been invited to join a board')
end
end
