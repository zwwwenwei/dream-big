require "test_helper"

class UserTest < ActiveSupport::TestCase

  test "should not save user without username" do
    user = User.new
    user.email = 'test@email.com'
    user.password = 'test'
    assert_not user.save, "Saved user without a username"
  end

  test "should not save user without email" do
    user = User.new
    user.username = 'test'
    user.password = 'test'
    assert_not user.save, "Saved user without a email"
  end

  test "should not save user without password" do
    user = User.new
    user.username = 'test'
    user.email = 'test@email.com'
    assert_not user.save, "Saved user without a password"
  end

  test "admin user fixture exists" do
    assert_equal "admin", users(:admin).username
  end
end
