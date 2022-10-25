require "test_helper"

class StudentJourneyTest < ActiveSupport::TestCase
  test "cant create a journey without a student" do
    journey = StudentJourney.new
    journey.timeline = 'gibberish'
    assert_not journey.save, "Saved journey without a student"
  end

  test "can save a journey with a student" do
    journey = StudentJourney.new
    journey.timeline = 'gibberish'
    journey.student_id = students(:admin).id
    assert journey.save, "Couldn't Save journey with a student"
  end

  test "journey fixture exists" do
    assert_equal 3.14, student_journeys(:admin).timeline
    assert_equal students(:admin).id, student_journeys(:admin).student_id
  end
end
