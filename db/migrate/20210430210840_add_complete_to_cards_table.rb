class AddCompleteToCardsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :completed, :boolean, null: false, default: false
  end
end
