class RenameStudentsType < ActiveRecord::Migration[7.0]
    def change
        rename_column :students, :type, :student_type
    end
  end