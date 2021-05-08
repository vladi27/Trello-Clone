class Api::CommentsController < ApplicationController

    def index
        @comments = Comment.all
        render :index
    end

    def create
        @comment = Comment.new(comment_params)
            if @comment.save
                render :show
            else
                render json: @comment.errors.full_messages, status: 422
            end
    end

    def update
        @comment = Comment.find(params[:id])
            if @comment.update(comment_params)
                render :show
            else
                render json: @comment.errors.full_messages, status: 422
            end
    end


    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
        head :no_content
    end


    private
    def comment_params
        params.require(:comment).permit(:author, :card_id, :body, :id)
    end

end