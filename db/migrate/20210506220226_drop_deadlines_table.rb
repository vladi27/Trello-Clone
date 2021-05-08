class DropDeadlinesTable < ActiveRecord::Migration[5.2]
   def up
    drop_table :deadlines
  end
  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
