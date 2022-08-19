class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :courseName
      t.string :courseDesc
      t.timestamps
    end
  end
end
