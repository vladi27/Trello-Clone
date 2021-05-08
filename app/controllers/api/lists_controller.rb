class Api::ListsController < ApplicationController
    before_action :require_logged_in

    def index
        @lists = List.all
        render :index

    end

     def create
        @list = List.new(list_params)
            if @list.save
                render :show
        else
                render json: @list.errors.full_messages, status: 422
            end
    end

    def update
        @list = List.find(params[:id])
            if @list.update(list_params)
                render :show
            else
                render json: @list.errors.full_messages, status: 422
     end
  end

    def destroy
        @list = List.find(params[:id])
        @list.destroy
        head :no_content
    end

    def update_pos
    @list = List.find(params[:id])
        if params[:list].key?(:card_positions)
            @list.card_positions = params[:list][:card_positions]
            @list.save
        else
            @list.card_positions = []
            @list.save
        end
    render :show
  end


   def list_params
    params.require(:list).permit(:title, :board_id, :id, card_positions: [])

    end
end

