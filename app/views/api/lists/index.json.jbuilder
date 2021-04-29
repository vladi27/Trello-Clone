@lists.each do |list|
json.set! list.id do
    json.extract! list, :id, :title, :board_id, :card_positions
    json.cards do
     list.cards.each do |card|
      json.set! card.id do
        json.extract! card, :id, :title, :list_id, :due_date
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
