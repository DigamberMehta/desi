import React, { useState, useEffect } from "react";
import { Plus, Trash2, Tag, Percent, Banknote } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useToast } from "../../hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { apiUrl } from "../../lib/api";

const AdminCoupons = ({ token }) => {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "percent",
    discountValue: "",
    isActive: true,
  });

  const fetchCoupons = async () => {
    try {
      const res = await fetch(apiUrl("/api/coupons"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCoupons(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discountValue) return;

    setSaving(true);
    try {
      const res = await fetch(apiUrl("/api/coupons"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newCoupon,
          discountValue: Number(newCoupon.discountValue),
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Coupon created successfully!",
        });
        setNewCoupon({
          code: "",
          discountType: "percent",
          discountValue: "",
          isActive: true,
        });
        fetchCoupons();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(apiUrl(`/api/coupons/${id}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Success", description: "Coupon deleted!" });
        fetchCoupons();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-neutral-900">Coupons</h2>
      </div>

      {/* Create Coupon Form */}
      <div className="bg-white p-6 rounded-xl border border-neutral-200">
        <h3 className="text-lg font-bold mb-4">Create New Coupon</h3>
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="text-sm font-semibold mb-1 block">Code</label>
            <Input
              placeholder="e.g. SUMMER20"
              value={newCoupon.code}
              onChange={(e) =>
                setNewCoupon({
                  ...newCoupon,
                  code: e.target.value.toUpperCase(),
                })
              }
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Type</label>
            <Select
              value={newCoupon.discountType}
              onValueChange={(val) =>
                setNewCoupon({ ...newCoupon, discountType: val })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percent">Percentage (%)</SelectItem>
                <SelectItem value="fixed">Fixed Amount (AED)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">
              Discount Value
            </label>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 20"
              value={newCoupon.discountValue}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, discountValue: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Button
              type="submit"
              disabled={saving}
              className="w-full bg-[#E60012] hover:bg-[#b8000e] text-white"
            >
              {saving ? (
                "Creating..."
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" /> Create
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Coupons List */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell className="font-mono font-bold">
                  {coupon.code}
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 font-semibold text-[#E60012]">
                    {coupon.discountType === "percent" ? (
                      <Percent className="w-3 h-3" />
                    ) : (
                      <Banknote className="w-4 h-4" />
                    )}
                    {coupon.discountValue}
                    {coupon.discountType === "percent" ? "% OFF" : " AED OFF"}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={coupon.isActive ? "success" : "secondary"}>
                    {coupon.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(coupon._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {coupons.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-neutral-500"
                >
                  No coupons found. Create one above!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCoupons;
