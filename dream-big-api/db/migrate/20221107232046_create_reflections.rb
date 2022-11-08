class CreateReflections < ActiveRecord::Migration[7.0]
  def change
    create_table :reflections do |t|
      t.string :reflectionText
      t.bigint :sectionID
      t.bigint :goalID
      t.timestamps
    end
  end
end
