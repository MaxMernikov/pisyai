class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :username
      t.integer :room_id
      t.boolean :close, default: true

      t.timestamps
    end
  end
end
