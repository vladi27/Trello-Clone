class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :body, null:false
      t.string :author, null: false
      t.integer :card_id, null: false
      t.timestamps
    end
  end
end
