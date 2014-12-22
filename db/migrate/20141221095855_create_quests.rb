class CreateQuests < ActiveRecord::Migration
  def change
    create_table :quests do |t|
      t.string :question
      t.string :answer

      t.timestamps
    end
  end
end
