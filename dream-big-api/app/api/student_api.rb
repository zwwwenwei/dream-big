require 'grape'

class StudentApi < Grape::API
  desc 'Allow retrieval of a single student'
  get '/student/:id' do
    student_parameters = ActionController::Parameters.new(params)
      .permit(
        :id
      )

    # Auth

    result = Student.find(params[:id])
    present result, with: Entities::StudentEntity
  end

  desc 'Allow creation of a Student'
  params do
  
    requires :name, type: String, desc: 'student Name'
    requires :phone, type: String, desc: 'student Phone number'
    requires :address, type: String, desc: 'student address'
    requires :user_id, type: Integer, desc: 'student user'
    optional :student_type, type: String, desc: 'student type'

  end
  post '/student' do
    student_parameters = ActionController::Parameters.new(params)
      .permit(
        :name,
        :phone,
        :address,
        :student_type,
        :user_id
      )

    # Auth...

    result = Student.create!(student_parameters) 

    present result, with: Entities::StudentEntity
  end

  desc 'Allow updating of a student'
  params do
    
    optional :name, type: String, desc: 'student name'
    optional :phone, type: String, desc: 'student phone'
    optional :address, type: String, desc: 'student address'
    optional :student_type, type: String, desc: 'student type'
    optional :user_id, type: Integer, desc: 'student user'
  end
  put '/student/:id' do
    student_parameters = ActionController::Parameters.new(params)
      .permit(
        :name,
        :phone,
        :address,
        :student_type,
        :user_id
        #Ex:- :default =>''
      )

    # Auth

    result = Student.find(params[:id])
    result.update! student_parameters

    present result, with: Entities::StudentEntity
  end

  desc 'Delete the student with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the student to delete'
  end
  delete '/student/:id' do
    Student.find(params[:id]).destroy!
    true
  end

  get '/student' do
    result = Student.all

    present result, with: Entities::StudentEntity
  end
end