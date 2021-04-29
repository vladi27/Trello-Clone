json.extract! @card, :title, :list_id, :id, :body, :due_date

 json.comments do
                @card.comments.each do |comment|
                 json.set! comment.id do
                json.extract! comment, :id, :body, :card_id, :author, :created_at, :updated_at
                end


                end
                end