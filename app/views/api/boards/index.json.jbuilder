
json.owned_boards
@boards.each do |board|
    json.set! board.id do
    json.extract! board, :id, :title, :list_positions

    end

        json.lists do
            board.lists.each do |list|
                json.set! list.id do
                json.extract! list, :id, :title, :board_id, :card_positions
                end


            end
    end

      json.cards do
                board.lists.each do |list|

                list.cards.each do |card|
                 json.set! card.id do
                json.extract! card, :id, :title, :list_id, :body, :due_date, :completed
                end

end

                end
                end


      json.comments do
                board.lists.each do |list|

                list.cards.each do |card|
                card.comments.each do |comment|
                json.set! comment.id do
                json.extract! comment, :id, :body, :card_id, :author, :created_at, :updated_at
                end

end
end

                end
                end
end

json.shared_boards
@shared_boards.each do |board|
    json.set! board.id do
    json.shared_board true
    json.extract! board, :id, :title, :list_positions

    end

        json.lists do
            board.lists.each do |list|
                json.set! list.id do
                json.extract! list, :id, :title, :board_id, :card_positions
                end


            end
    end

      json.cards do
                board.lists.each do |list|

                list.cards.each do |card|
                 json.set! card.id do
                json.extract! card, :id, :title, :list_id, :body, :due_date, :completed
                end

end

                end
end


                json.comments do
                board.lists.each do |list|

                list.cards.each do |card|
                card.comments.each do |comment|
                json.set! comment.id do
                json.extract! comment, :id, :body, :card_id, :author, :created_at, :updated_at
                end

end
end

                end
                end


                end



