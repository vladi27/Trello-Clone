json.extract! @list, :title, :board_id, :id, :card_positions
json.cards do
     @list.cards.each do |card|
      json.set! card.id do
        json.extract! card, :id, :title, :list_id
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
