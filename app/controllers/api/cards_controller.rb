class Api::CardsController < ApplicationController
    before_action :require_logged_in

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

  def destoy
    @card = Card.find(params[:id])
    @list.destroy
    head :no_content
    end



     private
    def card_params
    params.require(:card).permit(:title, :list_id)

    end
    
end