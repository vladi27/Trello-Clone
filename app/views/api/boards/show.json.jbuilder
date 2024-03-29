

json.extract! @board, :title, :id, :list_positions
 json.username @owner.username
 json.email @owner.email
 json.members @board.members, :username, :email
 json.lists do
     @board.lists.each do |list|
      json.set! list.id do
        json.extract! list, :id, :title, :board_id, :card_positions
        end

         json.cards do
                list.cards.each do |card|
                 json.set! card.id do
                json.extract! card, :id, :title, :list_id, :body, :due_date, :completed
                end
         json.comments do
                card.comments.each do |comment|
                 json.set! comment.id do
                json.extract! comment, :id, :body, :card_id, :author, :created_at, :updated_at
                end


                end
                end
end
end
    end
end



