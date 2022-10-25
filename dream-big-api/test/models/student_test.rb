require "test_helper"

class StudentTest < ActiveSupport::TestCase
  test "cant create a student without a user" do
    student = Student.new
    student.firstName = 'test'
    assert_not student.save, "Saved student without a user"
  end
  test "can create a student with a user" do
    student = Student.new
    student.user_id = users(:admin).id
    assert student.save, "Couldn't save student with user"
  end
  
  test "student fixture exists" do
    assert_equal "admin", students(:admin).firstName
    assert_equal users(:admin).id, students(:admin).user_id
  end
  
end
