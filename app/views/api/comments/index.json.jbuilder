@comments.each do |comment|
json.set! comment.id do
    json.extract! comment, :id, :author, :card_id, :body

end
end