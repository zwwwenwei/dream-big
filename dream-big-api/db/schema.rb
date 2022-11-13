# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_11_07_232418) do
  create_table "answers", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "answer"
    t.bigint "questionID"
    t.bigint "assessmentID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "assessments", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "journeyID"
    t.bigint "categoryID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "avatar_accessories", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "imgpath"
  end

  create_table "avatar_hairs", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "imgpath"
  end

  create_table "avatar_heads", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "imgpath"
  end

  create_table "avatar_torsos", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "imgpath"
  end

  create_table "avatars", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "avatar_head_id"
    t.bigint "avatar_torsos_id"
    t.bigint "avatar_hairs_id"
    t.bigint "avatar_accessories_id"
    t.index ["avatar_accessories_id"], name: "fk_rails_b7154260fe"
    t.index ["avatar_hairs_id"], name: "fk_rails_d213291014"
    t.index ["avatar_head_id"], name: "fk_rails_a8fde6201d"
    t.index ["avatar_torsos_id"], name: "fk_rails_12f7f2f036"
  end

  create_table "categories", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "name"
    t.string "description"
  end

  create_table "category_questions", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "question"
    t.bigint "categoryID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "goals", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "goalText"
    t.boolean "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "journeys", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "studentID"
    t.bigint "assessmentID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "planets", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "name"
    t.bigint "journeyID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "plans", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "sectionID"
    t.bigint "goalID"
    t.string "planText"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reflections", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "reflectionText"
    t.bigint "sectionID"
    t.bigint "goalID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "role_description"
  end

  create_table "sections", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.bigint "planetID"
    t.bigint "categoryID"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "students", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "firstName"
    t.string "lastName"
    t.integer "phone"
    t.string "address"
    t.string "student_type"
    t.bigint "user_id"
    t.bigint "avatar_id"
    t.index ["avatar_id"], name: "fk_rails_66f8a533c3"
    t.index ["user_id"], name: "fk_rails_148c9e88f4"
  end

  create_table "teachers", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_general_ci", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.bigint "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "fk_rails_642f17018b"
  end

  add_foreign_key "avatars", "avatar_accessories", column: "avatar_accessories_id"
  add_foreign_key "avatars", "avatar_hairs", column: "avatar_hairs_id"
  add_foreign_key "avatars", "avatar_heads"
  add_foreign_key "avatars", "avatar_torsos", column: "avatar_torsos_id"
  add_foreign_key "students", "avatars"
  add_foreign_key "students", "users"
  add_foreign_key "users", "roles"
end
