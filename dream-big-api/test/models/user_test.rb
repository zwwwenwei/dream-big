require "test_helper"

class UserTest < ActiveSupport::TestCase

  test "should not save user without username" do
    user = User.new
    user.email = 'test@email.com'
    user.password = 'test';
    assert_not user.save, "Saved user without a username"
  end
  # test "the truth" do
  #   assert true
  # end
end
