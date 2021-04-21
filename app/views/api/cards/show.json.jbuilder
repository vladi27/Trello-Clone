json.extract! @card, :title, :list_id, :id, :body

 json.comments do
                @card.comments.each do |comment|
                 json.set! comment.id do
                json.extract! comment, :id, :body, :card_id, :author
                end


                end
                end