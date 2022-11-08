class CreatePlans < ActiveRecord::Migration[7.0]
  def change
    create_table :plans do |t|
      t.bigint :sectionID
      t.bigint :goalID
      t.string :planText
      t.timestamps
    end
  end
end
