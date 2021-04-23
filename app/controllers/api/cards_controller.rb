class Api::CardsController < ApplicationController
    before_action :require_logged_in

    def index
        # @board = Board.find(params[:board_id])
        # @lists = @board.lists
         @cards = Card.all

        render :index

    end

     def create
        @card = Card.new(card_params)

        if @card.save
            render :show
    else
            render json: @card.errors.full_messages, status: 422
        end
    end

    def update

        @card = Card.find(params[:id])

        if @card.update(card_params)
                render :show
        else
                render json: @card.errors.full_messages, status: 422
        end
    end

    def destroy

    @card = Card.find(params[:id])

    @card.destroy
    head :no_content
    end



     private
    def card_params
    params.require(:card).permit(:title, :list_id, :body, :id, :due_date)

    end

end
