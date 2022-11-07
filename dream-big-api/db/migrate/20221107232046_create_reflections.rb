class CreateReflections < ActiveRecord::Migration[7.0]
  def change
    create_table :reflections do |t|

      t.timestamps
    end
  end
end
