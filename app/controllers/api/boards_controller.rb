class Api::BoardsController < ApplicationController
    before_action :require_logged_in

    def create
        @board = Board.new(board_params)
        @board.owner_id = current_user.id
        @owner = current_user
        if @board.save
            render :show
    else
            render json: @board.errors.full_messages, status: 422
        end
    end

    def index
        @current = current_user
        @boards = current_user.owned_boards
        @shared_boards = current_user.boards
        render :index
    end

    def update
        @board = Board.find(params[:id])
            if @board.update(board_params)
                render :show
            else
                render json: @board.errors.full_messages, status: 422
     end
  end

    def show
        @board = Board.find(params[:id])
        @current = current_user
        @owner = User.find(@board.owner_id)
        render :show
    end

    def destroy
    @board = Board.find(params[:id])
    @board.destroy
    head :no_content
    end

    def update_lists_pos
    @board = Board.find(params[:id])

    if params[:board].key?(:list_positions)

        @board.list_positions = params[:board][:list_positions]
        @board.save
    else
        @board.list_positions = []
        @board.save
    end
    render :show
  end



    def board_params
    params.require(:board).permit(:title, {:list_positions => []}, :id)

    end
end
