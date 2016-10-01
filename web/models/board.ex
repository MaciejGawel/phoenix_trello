defmodule PhoenixTrello.Board do
  use PhoenixTrello.Web, :model

  @derive {Poison.Encoder, only: [:id, :name, :user]}
  alias PhoenixTrello.{List, Card, UserBoard, User}

  schema "boards" do
    field :name, :string
    belongs_to :user, User

    has_many :user_boards, UserBoard
    has_many :members, through: [:user_boards, :user]
    has_many :lists, List

    timestamps()
  end

  @required_fields ~w(name user_id)
  @optional_fields ~w()

  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def preload_all(query) do
    cards_query = from c in Card, preload: :members
    lists_query = from l in List, preload: :cards

    from b in query, preload: [:user, :members, lists: ^lists_query]
  end

  def slug_id(board) do
    "#board.is}-#{board.slug}"
  end
end
