class CreateCourseVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :course_versions do |t|
      t.date :startdate
      t.date :enddate
      t.date :datecensus
      
      t.timestamps
    end
  end
end
