class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :code
      t.boolean :close, default: false

      t.timestamps
    end
  end
end
