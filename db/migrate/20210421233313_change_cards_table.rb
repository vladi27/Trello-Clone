class ChangeCardsTable < ActiveRecord::Migration[5.2]
  def change
     add_column :cards, :due_date, :datetime
  end
end
