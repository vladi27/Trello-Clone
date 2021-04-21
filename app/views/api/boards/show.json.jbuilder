

json.extract! @board, :title, :id, :list_positions
json.lists do
     @board.lists.each do |list|
      json.set! list.id do
        json.extract! list, :id, :title, :board_id, :card_positions
        end

         json.cards do
                list.cards.each do |card|
                 json.set! card.id do
                json.extract! card, :id, :title, :list_id, :body
                end
         json.comments do
                card.comments.each do |comment|
                 json.set! comment.id do
                json.extract! comment, :id, :body, :card_id, :author
                end


                end
                end
end
end
    end
end



