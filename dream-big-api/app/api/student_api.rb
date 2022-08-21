require 'grape'

class StudentApi < Grape::API

  desc 'Allow creation of a Student'
  params do
  
    requires :studentName, type: String, desc: 'student Name'
    requires :Phone, type: String, desc: 'student Phone number'
    requires :address, type: String, desc: 'student address'
    requires :type, type: String, desc: 'student type'

  end
  post '/student' do
    student_parameters = ActionController::Parameters.new(params)
      .permit(
        :studentName,
        :Phone,
        :address,
        :type
      )

    # Auth...

    result = Student.create!(student_parameters) 

    present result, with: Entities::StudentEntity
  end

  desc 'Allow updating of a student'
  params do
    
    optional :studentName, type: String, desc: 'student name'
    optional :Phone, type: String, desc: 'student phone'
    optional :address, type: String, desc: 'student address'
    optional :type, type: String, desc: 'student type'
  end
  put '/student/:id' do
    student_parameters = ActionController::Parameters.new(params)
      .permit(
        :studentName,
        :Phone,
        :address,
        :type
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
    Studenet.find(params[:id]).destroy!
    true
  end

  get '/student' do
    result = Student.all

    present result, with: Entities::StudentEntity
  end
end