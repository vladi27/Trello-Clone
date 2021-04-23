class CreateDeadlines < ActiveRecord::Migration[5.2]
  def change
    create_table :deadlines do |t|
      t.integer :card_id, null:false
      t.datetime :duedate, null:false
      t.string :user
      t.timestamps
    end
  end
end
